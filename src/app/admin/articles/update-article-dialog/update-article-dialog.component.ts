import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../articles.component";
import {Article} from "../../../../models/article.model";
import {ArticlesService} from "../articles.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-article-dialog',
  templateUrl: './update-article-dialog.component.html',
  styleUrls: ['./update-article-dialog.component.scss']
})
export class UpdateArticleDialogComponent implements OnInit {
  articles:  Article[];
  now: Date;
  selectedArticle:  Article  = { id:this.data.id, title:this.data.title, body:  this.data.body, updated_at: this.now};

  constructor(private articleService: ArticlesService,
              private router: Router,
              public dialogRef: MatDialogRef<UpdateArticleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  closeDialog() {
    this.dialogRef.close();
  }
  createOrUpdateArticle(form, article: Article){
    this.selectedArticle = article;

    console.log('SelectedArticle: ', this.selectedArticle)
    if(this.selectedArticle && this.selectedArticle.id){
      form.value.id = this.selectedArticle.id;
      this.articleService.updateArticle(form.value).subscribe((article: Article)=>{
        console.log("Article updated" , article);
        this.reloadData();
        this.router.navigate(['/articles']);
        this.closeDialog();
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
        this.router.navigate(['/articles']);
        this.reloadData();
        this.closeDialog();
      });
    }

  }
  reloadData() {
    this.articleService.readArticles().subscribe((articles: Article[])=>{
      this.articles = articles;
      console.log('RELOAD: ', this.articles);
    })
  }
  ngOnInit() {
    this.articleService.readArticles().subscribe((articles: Article[])=>{
      this.articles = articles;
    })
    console.log('DATAx: ', this.data);
  }

}
