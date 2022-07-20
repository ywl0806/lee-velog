import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CHECK_POLICIES_KEY } from '../decorator/check-policies.decorator';
import { PolicyHandler } from '../interface/iPolicyHandler.interface';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const policyHandler =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        ctx.getHandler(),
      ) || [];
    const { user } = ctx.getContext().req;

    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandler.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }
  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
