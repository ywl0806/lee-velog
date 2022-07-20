import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (_, context: GqlExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    return gqlReq.user;
  },
);
