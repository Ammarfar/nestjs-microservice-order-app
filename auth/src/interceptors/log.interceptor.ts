import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    console.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method}`,
    );

    return next.handle().pipe(
      tap(() => {
        console.log(
          `End Request for ${request.path}`,
          `method=${request.method} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }
}
