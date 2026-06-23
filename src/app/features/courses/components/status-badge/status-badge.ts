import { Component, input } from '@angular/core';

import { SharedModule } from '../../../../shared/shared-module';

import { CourseStatus } from '../../enums/course-status';

@Component({
  selector: 'app-status-badge',
  imports: [SharedModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
})
export class StatusBadge {
  status = input.required<CourseStatus>();

  get statusClass(): string {
    const statusClasses: Record<CourseStatus, string> = {
      [CourseStatus.Active]: 'status-active',
      [CourseStatus.Draft]: 'status-draft',
      [CourseStatus.Archived]: 'status-archived',
    };

    return statusClasses[this.status()];
  }

  get statusLabelKey(): string {
    return `STATUSES.${this.status().toUpperCase()}`;
  }
}
