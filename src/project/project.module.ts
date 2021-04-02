import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProjectController,
  ProjectCategoryController,
  ProjectIssueTypeController,
  ProjectStatusController,
  ProjectWebhookController,
  ProjectMilestoneController,
} from './controllers';
import {
  ProjectCategoryService,
  ProjectIssueTypeService,
  ProjectMilestoneService,
  ProjectService,
  ProjectStatusService,
  ProjectWebhookService,
} from './services';
import {
  ProjectCategoryResource,
  ProjectIssueTypeResource,
  ProjectMilestoneResource,
  ProjectResource,
  ProjectStatusResource,
  ProjectWebhookResource,
} from './resources';
import { ProjectMiddleware } from './middlewares/project.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectResource,
      ProjectCategoryResource,
      ProjectIssueTypeResource,
      ProjectMilestoneResource,
      ProjectStatusResource,
      ProjectWebhookResource,
    ]),
  ],
  controllers: [
    ProjectController,
    ProjectCategoryController,
    ProjectIssueTypeController,
    ProjectStatusController,
    ProjectMilestoneController,
    ProjectWebhookController,
  ],
  providers: [
    ProjectService,
    ProjectCategoryService,
    ProjectIssueTypeService,
    ProjectStatusService,
    ProjectMilestoneService,
    ProjectWebhookService,
  ],
})
export class ProjectModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(ProjectMiddleware).forRoutes('projects');
  }
}
