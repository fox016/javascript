function HashSet()
{
	this.table = {};
	var hashSet = this;

	this.add = function(obj)
	{
		if(hashSet.contains(obj))
			return;
		hashSet.table[obj.hashCode] = obj;
	}

	this.contains = function(obj)
	{
		return (typeof hashSet.table[obj.hashCode] !== "undefined");
	}

	this.toList = function(obj)
	{
		var list = [];
		for(var key in hashSet.table)
		{
			list.push(hashSet.table[key]);
		}
		return list;
	}

	this.concat = function(otherSet)
	{
		var returnSet = new HashSet();
		for(var key in hashSet.table)
		{
			returnSet.table[key] = hashSet.table[key];
		}
		for(var key in otherSet.table)
		{
			returnSet.table[key] = otherSet.table[key];
		}
		return returnSet;
	}
}
