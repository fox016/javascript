width = 100
height = 30
color= "rgb(65,215,200)"
y = 0
for x in xrange(55, 800, 150):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height)+", \"color\": \""+color+"\"},"
y = 150
for x in xrange(10, 701, 110):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height)+", \"color\": \""+color+"\"},"
y = 200
for x in xrange(10, 701, 110):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height)+", \"color\": \""+color+"\"},"
