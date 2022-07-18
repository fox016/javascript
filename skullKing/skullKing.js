var current_page = 0;
var players = [];
var rounds = [];

var _edit_player_name = null;
var _edit_player_round = null;

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
      for(let i = nameCount; i < count; i++)
      {
        $("#playerNameDiv").append("<input class='playerName' type='text' />");
      }
    }
    else if(nameCount > count)
    {
      for(let i = 0; i < nameCount - count; i++)
        $("#playerNameDiv .playerName:last-child").remove();
    }
  }
  if(page == 3)
  {
    let defaultRoundCount = 10;
    for(let i = 1; i <=15; i++) {
      $("#roundCount").append("<option value='"+i+"' " + (i==defaultRoundCount ? "SELECTED" : "") + ">"+i+"</option>");
    }
    setRounds(defaultRoundCount);
    $("#roundCount").unbind().change(function() {
      setRounds($(this).val());
    });
  }
  else if(page == 4)
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

    rounds = [];
    $(".roundSizeInput").each(function(index, element)
    {
      rounds.push({
        count: myParseInt($(this).val()),
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

function refreshPlayers(callback)
{
  if(typeof callback !== "function")
    callback = function(){};

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
      $(this).removeClass("error");
    });
    $(".saveBtn").unbind('click').click(function()
    {
      let table = $(this).closest(".recordTable");
      let player = getPlayerByName($(".playerNameDisplay", $(this).closest(".player")).html());
      let round = buildRound(table);
      if(isValidRound(round, table))
      {
        player.score = parseInt($(".currentRoundTotal", table).html());
        round.score = parseInt($(".currentRoundScore", table).html());
        player.history.push(round);
        refreshPlayers();
      }
    });
    $(".editBtn").unbind('click').click(function()
    {
      _edit_player_name = $(".playerNameDisplay", $(this).closest(".player")).html();
      let player = getPlayerByName(_edit_player_name);
      _edit_player_round = player.history.pop();
      player.score -= _edit_player_round.score;
      refreshPlayers(function() {
        // Open player
        let playerDiv = getPlayerDivByName(_edit_player_name);
        $(".playerHeader", playerDiv).trigger('click');
        // Populate with _edit_player_round data
        $(".bidInput", playerDiv).val(_edit_player_round.bid);
        $(".actualInput", playerDiv).val(_edit_player_round.actual);
        $(".bonusInput", playerDiv).val(_edit_player_round.bonus);
      });
    });
    callback();
  });
  resize();
}

function buildRound(table)
{
  let roundNum = parseInt($(".historyRound", $(table).closest(".historyItem")).html());
  return {
    bid: $(".bidInput", table).val(),
    actual: $(".actualInput", table).val(),
    bonus: $(".bonusInput", table).val(),
    cards: rounds[roundNum-1].count,
    round: roundNum,
  };
}

function myParseInt(str)
{
  let myInt = parseInt(str);
  if(isNaN(myInt))
    return 0;
  return myInt;
}

function isValidRound(round, table)
{
  let isValid = true;
  $("input", table).removeClass("error");
  if(round.bid == "" || myParseInt(round.bid) < 0 || myParseInt(round.bid) > myParseInt(round.cards))
  {
    $(".bidInput", table).addClass("error");
    isValid = false;
  }
  if(round.actual == "" || myParseInt(round.actual) < 0 || myParseInt(round.actual) > myParseInt(round.cards))
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
  if(history.length < rounds.length)
  {
    html += "" +
      "<div class='historyItem'>" +
        "<div class='historyRound'>" + (history.length+1) + "</div>" +
        "<div class='historyRecord'>" +
          "<table class='recordTable'>" +
            "<tbody>" +
              "<tr class='cardCountRow'>" +
                "<th colspan=2>Cards:</th>" +
                "<th colspan=2>" + rounds[history.length].count + "</th>" +
              "</tr>" +
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
                "<td><input type='number' size='3' class='bonusInput' /></td>" +
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
              "<tr class='cardCountRow'>" +
                "<th colspan=2>Cards:</th>" +
                "<th colspan=2>" + rounds[h.round-1].count + "</th>" +
              "</tr>" +
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
                "<td colspan=2>" + (i == history.length -1 ? "<button class='editBtn'>Edit</button>" : "") + "</td>" +
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
  round.bid = myParseInt(round.bid);
  round.actual = myParseInt(round.actual);
  round.bonus = myParseInt(round.bonus);
  if(round.bid == round.actual) // If bid is met
  {
    if(round.bid == 0)
      score = round.cards * 10 + round.bonus;
    else
      score = round.actual * 20 + round.bonus;
  }
  else // If bid is NOT met
  {
    if(round.bid == 0)
      score = round.cards * -10;
    else
      score = -10 * Math.abs(round.bid - round.actual);
    if(round.bonus < 0)
      score += round.bonus;
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

function getPlayerDivByName(name)
{
  let playerDiv = null;
  $(".player").each(function() {
    if($(".playerNameDisplay", this).html() == name) {
      playerDiv = this;
      return false;
    }
  });
  return playerDiv;
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

function setRounds(roundCount)
{
  let rows = [];
  for(let i = 0; i < roundCount; i++)
  {
    rows.push("<tr><td>" + (i+1) + "</td>" +
      "<td>" +
        "<input class='roundSizeInput' type='number' inputmode='numeric' pattern='[0-9]*' size=2 value=" + (i+1) + ">" +
      "</td>" +
      "</tr>"
    );
  }
  $("#configureRoundsTable tbody").html(rows);
  resize();
}
