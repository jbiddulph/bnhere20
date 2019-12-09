import {Injectable} from "@angular/core";
import { Observable, of, throwError } from  'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Article} from "../../../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  PHP_API_SERVER = "http://127.0.0.1:8000";
  constructor(private http: HttpClient) {}

  readArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.PHP_API_SERVER}/api/articles`);
  }

  createArticle(article: Article): Observable<Article>{
    return this.http.post<Article>(`${this.PHP_API_SERVER}/api/article`, article);
  }

  updateArticle(article: Article){
    return this.http.put<Article>(`${this.PHP_API_SERVER}/api/article`, article);
  }

  deleteArticle(id: number){
    return this.http.delete<Article>(`${this.PHP_API_SERVER}/api/article/${id}`);
  }
}
