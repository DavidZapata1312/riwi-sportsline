import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, url, body } = req;
        const start = Date.now();

        console.log(`➡️ [${method}] ${url}`);
        if (Object.keys(body).length) {
            console.log('🧾 Body:', body);
        }

        return next.handle().pipe(
            tap(() => {
                const responseTime = Date.now() - start;
                console.log(`⬅️ [${method}] ${url} - ${responseTime}ms`);
            }),
        );
    }
}
