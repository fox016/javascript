"""
y = 300
width = 200
height = 1200
for x in xrange(0, 3500, 400):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height) + "},"

y = 280
width = 20
height = 20
for x in xrange(0, 3500, 400):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height) + "},"
for x in xrange(180, 3500, 400):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height) + "},"
"""

"""
y = 270
d = 1
for x in xrange(25, 3500, 400):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"dir\": "+str(d)+"},"
	print "{\"x\": "+str(x+50)+", \"y\": "+str(y)+", \"dir\": "+str(d)+"},"
"""

"""
y = 370
width = 30
height = 30
for x in xrange(200, 2000, 200):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height) + "},"
"""

"""
y = 370
height = 30
width = 170
for x in xrange(430, 2000, 400):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"width\": "+str(width)+", \"height\": "+str(height) + "},"
"""

y = 150
for x in xrange(230, 2000, 60):
	print "{\"x\": "+str(x)+", \"y\": "+str(y)+", \"dir\": 1},"
