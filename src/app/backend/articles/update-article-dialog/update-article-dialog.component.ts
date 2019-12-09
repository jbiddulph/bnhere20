import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../articles.component";
import {Article} from "../../../../models/article.model";
import {ArticlesService} from "../articles.service";

@Component({
  selector: 'app-update-article-dialog',
  templateUrl: './update-article-dialog.component.html',
  styleUrls: ['./update-article-dialog.component.scss']
})
export class UpdateArticleDialogComponent implements OnInit {
  articles:  Article[];
  selectedArticle;
  constructor(private articleService: ArticlesService,
              public dialogRef: MatDialogRef<UpdateArticleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog() {
    this.dialogRef.close();
  }
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
  reloadData() {
    this.articleService.readArticles().subscribe((articles: Article[])=>{
      this.articles = articles;
      console.log(this.articles);
    })
  }
  ngOnInit() {
    console.log('DATAx: ', this.data);
  }

}
