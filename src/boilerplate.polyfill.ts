import _ from 'lodash';
import type { ObjectLiteral } from 'typeorm';
import { Brackets, SelectQueryBuilder } from 'typeorm';

import type { PageOptionsDto } from './common/dto/page-options.dto';
import { PageMetaDto } from './common/dto/page-meta.dto';
import { PageDto } from './common/dto/page.dto';

declare global {
  interface Array<T> {
    toDtos<Dto>(
      options?: unknown,
    ): Dto[];
    toPageDto(pageMetaDto: PageMetaDto, options?: unknown): PageDto<T>;
  }
}

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    searchByString(
      q: string,
      columnNames: string[],
      options?: {
        formStart: boolean;
      },
    ): this;

    paginate(
      this: SelectQueryBuilder<Entity>,
      pageOptionsDto: PageOptionsDto,
      options?: Partial<{ takeAll: boolean; skipCount: boolean }>,
    ): Promise<[Entity[], PageMetaDto]>;

    leftJoinAndSelect(
      this: SelectQueryBuilder<Entity>,
      property: string,
      alias: string,
      condition?: string,
      parameters?: ObjectLiteral,
    ): this;

    leftJoin(
      this: SelectQueryBuilder<Entity>,
      property: string,
      alias: string,
      condition?: string,
      parameters?: ObjectLiteral,
    ): this;

    innerJoinAndSelect(
      this: SelectQueryBuilder<Entity>,
      property: string,
      alias: string,
      condition?: string,
      parameters?: ObjectLiteral,
    ): this;

    innerJoin(
      this: SelectQueryBuilder<Entity>,
      property: string,
      alias: string,
      condition?: string,
      parameters?: ObjectLiteral,
    ): this;
  }
}

export function registerArrayExtensions(): void {
  Array.prototype.toDtos = function <
    Entity extends { toDto?: (options?: unknown) => Dto },
    Dto,
  >(options?: unknown): Dto[] {
    return _.compact(
      _.map(this as Entity[], (item: Entity) =>
        typeof item.toDto === 'function' ? item.toDto(options as never) : null,
      ) as (Dto | null)[],
    );
  };

  Array.prototype.toPageDto = function (
    pageMetaDto: PageMetaDto,
    options?: unknown,
  ) {
    return new PageDto(this.toDtos(options), pageMetaDto);
  };

  SelectQueryBuilder.prototype.searchByString = function (
    q,
    columnNames,
    options,
  ) {
    if (!q) {
      return this;
    }

    this.andWhere(
      new Brackets((qb) => {
        for (const item of columnNames) {
          qb.orWhere(`${item} ILIKE :q`);
        }
      }),
    );

    if (options?.formStart) {
      this.setParameter('q', `${q}%`);
    } else {
      this.setParameter('q', `%${q}%`);
    }

    return this;
  };

  SelectQueryBuilder.prototype.paginate = async function (
    pageOptionsDto: PageOptionsDto,
    options?: Partial<{
      skipCount: boolean;
      takeAll: boolean;
    }>,
  ) {
    if (!options?.takeAll) {
      this.skip(pageOptionsDto.skip).take(pageOptionsDto.take);
    }

    const entities = await this.getMany();

    let itemCount = -1;

    if (!options?.skipCount) {
      itemCount = await this.getCount();
    }

    const pageMetaDto = new PageMetaDto({
      itemCount,
      pageOptionsDto,
    });

    return [entities, pageMetaDto];
  };
}
