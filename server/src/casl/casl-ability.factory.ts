import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import {
  InferSubjects,
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Action } from 'src/auth/enums/action.enum';

type Subjects = InferSubjects<typeof Post | typeof User> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Post, { userId: user.id });
    cannot(Action.Read, Post, { userId: null });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
