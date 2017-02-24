#Quickhull
Quickhull is a method of computing the convex hull of a finite set of points in the plane. It uses a divide and conquer approach similar to that of quicksort, which its name derives from. Its average case complexity is considered to be O(n * log(n)), whereas in the worst case it take O(n²) (quadratic).

![Quickhull](https://upload.wikimedia.org/wikipedia/commons/4/42/Animation_depicting_the_quickhull_algorithm.gif)

[wikipedia](https://en.wikipedia.org/wiki/Quickhull)

###Quickhull in javascript

Is a quickhull algorithm in javascript.

Required file: ```js/quickhull.js```
Other files are use in example

#####How to use
Link quickhull script:
```<script src="js/quickhull.js" type="text/javascript"></script>```

Create array points. Accepted x,y and lat,lng.

```
[
	{"x":363,"y":100},
    {"x":290,"y":143},
    {"x":331,"y":233},
    {"x":405,"y":175},
    {"x":404,"y":72},
    {"x":308,"y":55},
    {"x":243,"y":202}
]
```

Instance a quickhull:
```var quickhull = new Quickhull(points);```

Send your points to function ```getHullPoints(sortable)```:
quickhull.getHullPoints(true)
if you need the quickhull return in order send ```true``` in sortable.

The ```getHullPoints``` function return:

```
[
	{"x":405,"y":175},
    {"x":331,"y":233},
    {"x":243,"y":202},
    {"x":308,"y":55},
    {"x":404,"y":72}
]
```

---

**Version**

v0.9.0 - release: 22/02/2017

Change log:
- First release
