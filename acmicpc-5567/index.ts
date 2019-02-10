import * as fs from 'fs';
import * as path from 'path';
import {bindNodeCallback, from, Observable, of} from "rxjs/index";
import {concatMap, map} from "rxjs/internal/operators";

const executeFromLocal: boolean = true;
const inputPath: string = executeFromLocal ? path.resolve(__dirname, './source') : '/dev/stdin';

// 시간 복잡도: O(n+m)
// 공간 복잡도: O(m)
bindNodeCallback(fs.readFile)(inputPath).pipe(
  concatMap((buffer: Buffer): Observable<number> => {
    const root: number[][]= [];
    const n = Number(buffer.toString('utf-8').split('\n')[0]);
    const m = Number(buffer.toString('utf-8').split('\n')[1]);
    const checked: number[] = [];

    for (let i = 0; i <= n; i++) {
      root[i] = [];
      checked[i] = 0;
    }


    // 양방향 그래프 생성
    for (let i = 0; i < m; i++) {
      const [a, b] = [
        Number(buffer.toString('utf-8').split('\n')[i+2].split(' ')[0]),
        Number(buffer.toString('utf-8').split('\n')[i+2].split(' ')[1])
      ];

      root[a].push(b);
      root[b].push(a);
    }


    const startingPoint: number = 1;
    const found = (startingPoint: number) => {
      checked[startingPoint] = startingPoint;

      let q: number[] = [startingPoint];

      while (q.length > 0) {
        let c: number = q.shift() as number;
        root[c].forEach((way: number) => {
          if (checked[way] == 0) {
            // 다음 정점거리
            checked[way] = checked[c] + 1;
            console.log(Number(way));
            q.push(Number(way));
          }
        });
      }

      return checked;
    };


    let tomodachiCount = 0;
    const foundBros = found(startingPoint);
    for(let i =2; i<=n; i++){
      if(foundBros[i] == 2 || foundBros[i] == 3){
        tomodachiCount++;
      }
    }

    return of(tomodachiCount);
  }),
).subscribe((tomodachiCount) => {
  console.log('tomodachiCount', tomodachiCount);
});

