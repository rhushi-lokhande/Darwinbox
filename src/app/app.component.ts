import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataService } from './service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private game;
    private incompleteGames = [];
    private tictactoe = [];
    private currenUser = true;
    private win = false;
    constructor(private _dataservice: DataService) {
    }
    ngOnInit() {
        this.getAllGames();
    }
    getAllGames(): void {
        this.incompleteGames = [];
        this._dataservice.getAllGames().subscribe((res: any) => {
            this.incompleteGames = res;
        });
    }
    startNewGame(): void {
        this._dataservice.startNewGame().subscribe(res => {
            console.log(res);
            this.game = res;
            this.formTictactoe();
            this.incompleteGames.push(this.game);
        });
    }
    startIncompleteGame(game): void {
        this.game = game;
        this.formTictactoe();
        this.currenUser = this.game.moves.length % 2 === 0;
    }
    formTictactoe(): void {
        this.win = false;
        this.tictactoe = [];
        for (let i = 0; i < 3; i++) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.getMoveDetails(i, j) || {});
            }
            this.tictactoe.push(row);
        }
    }
    private getMoveDetails(i, j) {
        return this.game.moves.find(move => {
            return move.row_Id === i && move.col_Id === j;
        });
    }
    getMove(i, j): string {
        return this.tictactoe[i][j].user || '';
    }
    addMove(i, j): void {
        if (this.game.moves.length === 9 || this.win) {
            return;
        }
        const move = {
            id: this.game._id,
            user: this.getcurrentUser(),
            row_Id: i,
            col_Id: j
        };
        this._dataservice.addMove(move).subscribe(res => {
            console.log(res);
            this.game.moves.push(move);
            this.formTictactoe();

            if (this.game.moves.length > 4 && this.isGameWin()) {
                this.win = true;
                this._dataservice.winOrDrawGame({
                    id: this.game._id,
                    user: this.getcurrentUser(),
                    win: true
                }).subscribe(() => {
                    this.getAllGames();
                });
            } else if (this.game.moves.length === 9) {
                this._dataservice.winOrDrawGame({
                    id: this.game._id,
                    win: false
                }).subscribe(() => {
                    this.getAllGames();
                });
            } else {
                this.currenUser = !this.currenUser;
            }
        });
    }
    getcurrentUser(): string {
        return this.currenUser ? 'O' : 'X';
    }
    pause(): void {
        this.game = undefined;
        this.getAllGames();
    }
    isGameWin(): boolean {
        const u = this.getcurrentUser();
        const m = this.tictactoe;
        switch (true) {
            case m[0][0].user === u && m[0][1].user === u && m[0][2].user === u:
                return true;
            case m[1][0].user === u && m[1][1].user === u && m[1][2].user === u:
                return true;
            case m[2][0].user === u && m[2][1].user === u && m[2][2].user === u:
                return true;

            case m[0][0].user === u && m[1][0].user === u && m[2][0].user === u:
                return true;
            case m[0][1].user === u && m[1][1].user === u && m[2][1].user === u:
                return true;
            case m[0][2].user === u && m[1][2].user === u && m[2][2].user === u:
                return true;

            case m[0][0].user === u && m[1][1].user === u && m[2][2].user === u:
                return true;
            case m[0][2].user === u && m[1][1].user === u && m[2][0].user === u:
                return true;
        }
    }
}
