import {Component, effect, EventEmitter, input, Input, Output} from '@angular/core';
import {trackById} from '@common/shared/utils/forms-track-by';
import {pageSize} from '@common/projects/common-projects.consts';
import {IReport} from '../reports.consts';

@Component({
  selector: 'sm-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent {
  constructor() {
    effect(() => {
      if (this.reports()) {
        this.loading = false;
      }
    });
  }
  pageSize = pageSize;
  reports = input<IReport[]>([]);
  @Input() hideMenu = false;
  @Input() noMoreReports = false;
  @Input() allTags: string[] = [];
  @Input() archive = false;
  @Input() projectId;
  @Output() reportSelected = new EventEmitter();
  @Output() loadMore = new EventEmitter();
  @Output() reportCardUpdateMetadata = new EventEmitter<{ report: IReport; readOnly: boolean }>();
  @Output() reportCardUpdateName = new EventEmitter<{ name: string; report: IReport }>();
  @Output() newReport = new EventEmitter<string>();
  @Output() addTag = new EventEmitter<{ report: IReport; tag: string }>();
  @Output() moveToArchive = new EventEmitter<{ report: IReport; archive: boolean }>();
  @Output() removeTag = new EventEmitter<{ report: IReport; tag: string }>();
  @Output() moveTo = new EventEmitter<IReport>();
  @Output() delete = new EventEmitter<IReport>();
  @Output() share = new EventEmitter<IReport>();

  trackByFn = trackById;
  loading: boolean;

  loadMoreAction() {
    this.loading = true;
    this.loadMore.emit();
  }
}
