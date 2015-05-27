"""
width = 70
height = 30
color= "rgb(65,215,200)"
border = "rgb(0,0,0)"
y = 0
for x in xrange(15, 800, 100):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height)+", \"color\": \""+color+"\", \"border\": \""+border+"\"},"
"""

width = 100
height = 30
color = "rgb(255,100,100)"
border = "rgb(0,0,0)"
y = 300
for x in xrange(50, 800, 200):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height)+", \"color\": \""+color+"\", \"border\": \""+border+"\"},"
