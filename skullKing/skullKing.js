var current_page = 0;
var players = [];

$(document).ready(function()
{
  $(window).resize(resize);

  setPage();

  $("#addPlayer").click(function()
  {
    let count = parseInt($("#playerCount").text());
    if(count < 6)
      $("#playerCount").html(count+1);
  });
  $("#removePlayer").click(function()
  {
    let count = parseInt($("#playerCount").text());
    if(count > 2)
      $("#playerCount").html(count-1);
  });
  $(".playerBtn").bind('touchmove', function(e) {
    e.preventDefault();
    $(this).click();
  });
  $(".playerBtn").bind('touchend', function(e) {
    e.preventDefault();
    $(this).click();
  });
  $(".nextBtn").click(function() { setPage(current_page+1); });
  $(".prevBtn").click(function() { setPage(current_page-1); });
});

function setPage(page)
{
  // Pre-loading logic
  if(typeof page !== "number")
    page = current_page+1;
  if(current_page == 2)
  {
    let valid = true;
    let names = [];
    $(".playerName").each(function()
    {
      let name = $.trim($(this).val());
      if(name == "" || names.includes(name))
      {
        $(this).addClass("error");
        valid = false;
      }
      else
      {
        $(this).removeClass("error");
        names.push(name);
      }
    });
    if(!valid && page > current_page)
      return;
  }

  // Loading logic
  if(page == 2)
  {
    let nameCount = $(".playerName").length;
    let count = parseInt($("#playerCount").text());
    let html = "";
    if(nameCount < count)
    {
      for(i = nameCount; i < count; i++)
      {
        $("#playerNameDiv").append("<input class='playerName' type='text' />");
      }
    }
    else if(nameCount > count)
    {
      for(i = 0; i < nameCount - count; i++)
        $("#playerNameDiv .playerName:last-child").remove();
    }
  }
  else if(page == 3)
  {
    players = [];
    $(".playerName").each(function()
    {
      players.push({
        name: $(this).val(),
        score: 0,
        history: [],
      });
    });
    refreshPlayers();
  }

  // Post-loading logic
  $(".page").hide();
  $("#page"+page).show();
  current_page = page;
  resize();
}

function refreshPlayers()
{
  let html = "";
  for(let i = 0; i < players.length; i++)
  {
    let p = players[i];
    html += "" +
      "<div class='player'>" +
        "<div class='playerHeader'>" +
          "<div class='playerNameDisplay'>" + p.name + "</div>" +
          "<div class='playerScoreDisplay'>" + p.score + "</div>" +
        "</div>" +
        "<div class='playerHistory'>" +
          getHistoryHtml(p.history) +
        "</div>" +
      "</div>";
  }
  $("#players").html(html).ready(function()
  {
    $(".playerHeader").unbind('click').click(function()
    {
      let player = $(this).closest(".player");
      if($(".playerHistory", player).is(":visible"))
      {
        $(".playerHistory").hide();
      }
      else
      {
        $(".playerHistory").hide();
        $(".playerHistory", player).show();
      }
      resize();
    });
    $(".recordTable input").unbind("change keypress keyup").bind("change keypress keyup", function()
    {
      let table = $(this).closest(".recordTable");
      let s = getRoundScore(buildRound(table));
      $(".currentRoundScore", table).html(s);
      if(s === "")
        $(".currentRoundTotal", table).html("");
      else
      {
        let total = parseInt($(".playerScoreDisplay", $(table).closest(".player")).html());
        $(".currentRoundTotal", table).html(parseInt(s)+total);
      }
      $("input", table).removeClass("error");
    });
    $(".saveBtn").unbind('click').click(function()
    {
      let table = $(this).closest(".recordTable");
      let player = getPlayerByName($(".playerNameDisplay", $(this).closest(".player")).html());
      let round = buildRound(table);
      if(isValidRound(round, table))
      {
        player.score = parseInt($(".currentRoundTotal", table).html());
        player.history.push(round);
        refreshPlayers();
      }
    });
  });
  resize();
}

function buildRound(table)
{
  return {
    bid: $(".bidInput", table).val(),
    actual: $(".actualInput", table).val(),
    bonus: $(".bonusInput", table).val(),
    round: $(".historyRound", $(table).closest(".historyItem")).html(),
  };
}

function isValidRound(round, table)
{
  let isValid = true;
  $("input", table).removeClass("error");
  if(round.bid < 0 || round.bid > round.round)
  {
    $(".bidInput", table).addClass("error");
    isValid = false;
  }
  if(round.actual < 0 || round.actual > round.round)
  {
    $(".actualInput", table).addClass("error");
    isValid = false;
  }
  if(round.bonus != "" && round.bonus.substring(round.bonus.length-1) != "0")
  {
    $(".bonusInput", table).addClass("error");
    isValid = false;
  }
  return isValid;
}

function getHistoryHtml(history)
{
  let html = "";
  if(history.length < 10)
  {
    html += "" +
      "<div class='historyItem'>" +
        "<div class='historyRound'>" + (history.length+1) + "</div>" +
        "<div class='historyRecord'>" +
          "<table class='recordTable'>" +
            "<tbody>" +
              "<tr>" +
                "<th>Bid</th>" +
                "<td><input type='number' inputmode='numeric' pattern='[0-9]*' size='2' class='bidInput' /></td>" +
                "<th>Score</th>" +
                "<td class='currentRoundScore'></td>" +
              "</tr>" +
              "<tr>" +
                "<th>Actual</th>" +
                "<td><input type='number' inputmode='numeric' pattern='[0-9]*' size='2' class='actualInput' /></td>" +
                "<th>Total</th>" +
                "<td class='currentRoundTotal'></td>" +
              "</tr>" +
              "<tr>" +
                "<th>Bonus</th>" +
                "<td><input type='number' inputmode='numeric' pattern='[0-9]*' size='2' class='bonusInput' /></td>" +
                "<td colspan=2><button class='saveBtn'>Save Round</button></td>" +
              "</tr>" +
            "</tbody>" +
          "</table>" +
        "</div>" +
      "</div>";
  }
  let total = 0;
  for(let i = 0; i < history.length; i++)
  {
    let h = history[i];
    let score = getRoundScore(h);
    total += score;
    html += "" +
      "<div class='historyItem'>" +
        "<div class='historyRound'>" + h.round + "</div>" +
        "<div class='historyRecord'>" +
          "<table class='recordTable'>" +
            "<tbody>" +
              "<tr>" +
                "<th>Bid</th>" +
                "<td>" + h.bid + "</td>" +
                "<th>Score</th>" +
                "<td>" + score + "</td>" +
              "</tr>" +
              "<tr>" +
                "<th>Actual</th>" +
                "<td>" + h.actual + "</td>" +
                "<th>Total</th>" +
                "<td>" + total + "</td>" +
              "</tr>" +
              "<tr>" +
                "<th>Bonus</th>" +
                "<td>" + h.bonus + "</td>" +
                "<td></td>" +
                "<td></td>" +
              "</tr>" +
            "</tbody>" +
          "</table>" +
        "</div>" +
      "</div>";
  }
  return html;
}

function getRoundScore(round)
{
  let score = 0;
  if(round.bid === "" || round.actual === "")
    return "";
  round.bid = parseInt(round.bid);
  round.actual = parseInt(round.actual);
  round.bonus = parseInt(round.bonus);
  if(isNaN(round.bonus))
    round.bonus = 0;
  round.round = parseInt(round.round);
  if(round.bid == round.actual)
  {
    if(round.bid == 0)
      score = round.round * 10 + round.bonus;
    else
      score = round.actual * 20 + round.bonus;
  }
  else
  {
    if(round.bid == 0)
      score = round.round * -10;
    else
      score = -10 * Math.abs(round.bid - round.actual);
  }
  return score;
}

function getPlayerByName(name)
{
  for(let i = 0; i < players.length; i++)
  {
    if(players[i].name == name)
      return players[i];
  }
  return null;
}

function resize()
{
  let width = $(window).width() + "px";
  let height = Math.max(document.body.clientHeight+30, $(window).height()) + "px";
  $('body').css('background-size', width + " " + height);
  $("#skullKingImg").ready(function(){
    $("#skullKingImg").css({
      top: parseInt(height.replace("px", ""))/2-($("#skullKingImg").height()/2) + "px",
      left: parseInt(width.replace("px", ""))/2-($("#skullKingImg").width()/2) + "px"
    });
  });
}
