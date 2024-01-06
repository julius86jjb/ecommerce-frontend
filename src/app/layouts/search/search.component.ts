import { Component, inject } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

   searchService = inject(SearchService);



  closeSearch() {
    this.searchService.closeSearch();
  }


}
