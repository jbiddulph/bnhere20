import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "./articles.service";
import {Article} from "../../../models/article.model";
import {MatDialog} from "@angular/material/dialog";
import {UpdateArticleDialogComponent} from "./update-article-dialog/update-article-dialog.component";

export interface DialogData {
  id: number;
  title: string;
  body: string;
}
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles:  Article[];
  selectedArticle:  Article  = { id:'', title:null, body:  null, updated_at: null};

  id: number;
  title: string;
  body: string;
  constructor(
    private articleService: ArticlesService,
    public dialog: MatDialog) { }


  createOrUpdateArticle(form){
    console.log('SelectedArticle Form: ', form)
    if(this.selectedArticle && this.selectedArticle.id){
      form.value.id = this.selectedArticle.id;
      this.articleService.updateArticle(form.value).subscribe((article: Article)=>{
        console.log("Article updated" , article);
        this.reloadData();
        this.selectedArticle= new class implements Article {
          body: string;
          id: any;
          title: string;
          updated_at: Date;
        }
      });
    }
    else{

      this.articleService.createArticle(form.value).subscribe((article: Article)=>{
        console.log("Article created, ", article);
        this.reloadData();
      });
    }

  }

  newArticle(): void {
    const dialogRef = this.dialog.open(UpdateArticleDialogComponent, {
      width: '300px',
      data: {id: '', title: '', body: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialog(article: Article): void {
    console.log('ARTCL: ', article);
    const dialogRef = this.dialog.open(UpdateArticleDialogComponent, {
      width: '300px',
      data: {id: article.id, title: article.title, body: article.body}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  selectArticle(article: Article){
    this.selectedArticle = article;
  }

  deleteArticle(id){
    this.articleService.deleteArticle(id).subscribe((article: Article)=>{
      console.log("Article deleted, ", article);
      this.reloadData();
    });
  }

  reloadData() {
    this.articleService.readArticles().subscribe((articles: Article[])=>{
      this.articles = articles;
      console.log(this.articles);
    })
  }
  ngOnInit() {
    this.articleService.readArticles().subscribe((articles: Article[])=>{
      this.articles = articles;
    })
  }

}
