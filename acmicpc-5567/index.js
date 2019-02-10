"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var index_1 = require("rxjs/index");
var operators_1 = require("rxjs/internal/operators");
var executeFromLocal = true;
var inputPath = executeFromLocal ? path.resolve(__dirname, './source') : '/dev/stdin';
// 시간 복잡도: O(n+m)
// 공간 복잡도: O(m)
index_1.bindNodeCallback(fs.readFile)(inputPath).pipe(operators_1.concatMap(function (buffer) {
    var root = [];
    var n = Number(buffer.toString('utf-8').split('\n')[0]);
    var m = Number(buffer.toString('utf-8').split('\n')[1]);
    var checked = [];
    for (var i = 0; i <= n; i++) {
        root[i] = [];
        checked[i] = 0;
    }
    // 양방향 그래프 생성
    for (var i = 0; i < m; i++) {
        var _a = [
            Number(buffer.toString('utf-8').split('\n')[i + 2].split(' ')[0]),
            Number(buffer.toString('utf-8').split('\n')[i + 2].split(' ')[1])
        ], a = _a[0], b = _a[1];
        root[a].push(b);
        root[b].push(a);
    }
    var startingPoint = 1;
    var found = function (startingPoint) {
        checked[startingPoint] = startingPoint;
        var q = [startingPoint];
        var _loop_1 = function () {
            var c = q.shift();
            root[c].forEach(function (way) {
                if (checked[way] == 0) {
                    // 다음 정점거리
                    checked[way] = checked[c] + 1;
                    console.log(Number(way));
                    q.push(Number(way));
                }
            });
        };
        while (q.length > 0) {
            _loop_1();
        }
        return checked;
    };
    var tomodachiCount = 0;
    var foundBros = found(startingPoint);
    for (var i = 2; i <= n; i++) {
        if (foundBros[i] == 2 || foundBros[i] == 3) {
            tomodachiCount++;
        }
    }
    return index_1.of(tomodachiCount);
})).subscribe(function (tomodachiCount) {
    console.log('tomodachiCount', tomodachiCount);
});
