d = 1
y = 150
for x in xrange(0, 400, 25):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"dir\": "+str(d)+"},"
	y -= 10
d = -1
y = 0
for x in xrange(425, 800, 25):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"dir\": "+str(d)+"},"
	y += 10
