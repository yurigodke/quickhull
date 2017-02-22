function Quickhull(allPoints) {
    this.returnPoints = allPoints;
    this.handlePoints = this.getHandlePoints(allPoints);
    this.hullPoints = new Array();
    this.sidePoints = new Array();
    var minX = this.getMinimalPoint('x');
    var maxX = this.getMaximumPoint('x');

    this.getTriangularPoint(this.handlePoints[minX], this.handlePoints[maxX], 'top');
    this.getTriangularPoint(this.handlePoints[minX], this.handlePoints[maxX], 'bottom');
}

Quickhull.prototype.getHandlePoints = function (points) {
    var handlePoints = new Array();
    for (var i = 0; i < points.length; i++) {
        handlePoints[i] = points[i];
        for (var value in points[i]) {
            switch (value) {
                case 'lat':
                    handlePoints[i].y = points[i][value];
                    break;
                case 'lng':
                    handlePoints[i].x = points[i][value];
                    break;
                default:
                    break;
            }
        }
    }
    return handlePoints;
};

Quickhull.prototype.getHullPoints = function (sorted) {
    var hullReturn = new Array();
    var hullHanddle;
    if (sorted) {
        hullHanddle = this.sortPoints()
    } else {
        hullHanddle = this.hullPoints;
    }
    for (var i = 0; i < hullHanddle.length; i++) {
        hullReturn.push(this.returnPoints[hullHanddle[i]]);
    }

    return hullReturn;
};

Quickhull.prototype.sortPoints = function () {
    var hullSort = new Array(
            new Array(),
            new Array(),
            new Array(),
            new Array()
            );

    var countTop = 0;
    var firstTop;
    for (var a = 0; a < this.sidePoints.length; a++) {
        if (this.sidePoints[a] == 'top') {
            countTop++;
        }
        if ((!firstTop) && (this.sidePoints[a] == 'top')) {
            firstTop = a;
        }
    }
    for (var i = 0; i < this.hullPoints.length; i++) {
        if (this.sidePoints[i] == 'minx') {
            hullSort[0].push(this.hullPoints[i])
        } else if (this.sidePoints[i] == 'maxx') {
            hullSort[1].push(this.hullPoints[i])
        } else if (this.sidePoints[i] == 'top') {
            var index = false;
            for (var a = 0; a < this.hullPoints.length; a++) {
                if ((!index) && (hullSort[2].indexOf(this.hullPoints[a]) < 0) && (this.sidePoints[a] == 'top')) {
                    index = this.hullPoints[a];
                }
                if ((index) && (this.handlePoints[index].x < this.handlePoints[this.hullPoints[a]].x) && (this.sidePoints[a] == 'top') && (hullSort[2].indexOf(this.hullPoints[a]) < 0)) {
                    index = this.hullPoints[a];
                }
            }

            hullSort[2].push(index);
        } else if (this.sidePoints[i] == 'bottom') {
            var index = false;
            for (var a = 0; a < this.hullPoints.length; a++) {
                if ((!index) && (hullSort[3].indexOf(this.hullPoints[a]) < 0) && (this.sidePoints[a] == 'bottom')) {
                    index = this.hullPoints[a];
                }
                if ((index) && (this.handlePoints[index].x > this.handlePoints[this.hullPoints[a]].x) && (this.sidePoints[a] == 'bottom') && (hullSort[3].indexOf(this.hullPoints[a]) < 0)) {
                    index = this.hullPoints[a];
                }
            }

            hullSort[3].push(index);
        }
    }

    var hullHanddle = new Array();
    hullHanddle = hullHanddle.concat(hullSort[1], hullSort[2], hullSort[0], hullSort[3]);

    return hullHanddle;
}

Quickhull.prototype.getMinimalPoint = function (axis) {
    var index;
    var handleValue;
    for (var i = 0; i < this.handlePoints.length; i++) {
        if (typeof handleValue == 'undefined') {
            handleValue = this.handlePoints[i][axis];
            index = i;
        } else if (handleValue > this.handlePoints[i][axis]) {
            handleValue = this.handlePoints[i][axis];
            index = i;
        }
    }
    this.sidePoints.push('min' + axis);
    this.hullPoints.push(index);
    return index;
};

Quickhull.prototype.getMaximumPoint = function (axis) {
    var index;
    var handleValue;
    for (var i = 0; i < this.handlePoints.length; i++) {
        if (typeof handleValue == 'undefined') {
            handleValue = this.handlePoints[i][axis];
            index = i;
        } else if (handleValue < this.handlePoints[i][axis]) {
            handleValue = this.handlePoints[i][axis];
            index = i;
        }
    }

    this.sidePoints.push('max' + axis);
    this.hullPoints.push(index);
    return index;
};

Quickhull.prototype.getTriangularPoint = function (pointA, pointB, mode) {
    var cuo = {
        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y,
    }

    var pointC;
    var index;
    for (var i = 0; i < this.handlePoints.length; i++) {
        var xPos = this.handlePoints[i].x
        var yPos = pointA.x - xPos;
        yPos = pointA.y - ((yPos * cuo.y) / cuo.x);

        if (mode == 'top') {
            var yOffset = pointA.y - yPos;
            if ((this.handlePoints[i].y > yPos)) {
                var yHandle = yOffset + this.handlePoints[i].y;
                if (typeof pointC == 'undefined') {
                    pointC = yHandle
                    index = i;
                } else if (pointC < yHandle) {
                    pointC = yHandle
                    index = i;
                }
            }
        } else if (mode == 'bottom') {
            var yOffset = pointA.y - yPos;
            if ((this.handlePoints[i].y < yPos)) {
                var yHandle = yOffset + this.handlePoints[i].y;
                if (typeof pointC == 'undefined') {
                    pointC = yHandle
                    index = i;
                } else if (pointC > yHandle) {
                    pointC = yHandle
                    index = i;
                }
            }
        }
    }

    if (typeof index != 'undefined') {
        this.hullPoints.push(index);
        this.sidePoints.push(mode);
        //return index;
        this.getTriangularPoint(this.handlePoints[index], pointB, mode);
        this.getTriangularPoint(pointA, this.handlePoints[index], mode);
    }
}
