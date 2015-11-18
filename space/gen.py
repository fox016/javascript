d = 1
y = 100
for x in xrange(0, 800, 50):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"dir\": "+str(d)+"},"
d = -1
y = 100
for x in xrange(0, 800, 50):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"dir\": "+str(d)+"},"
