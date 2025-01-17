import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { IChangelog } from '@gauzy/contracts';
import { MultiORMEntity, TenantOrganizationBaseEntity } from '@gauzy/core';
import { MikroOrmChangelogRepository } from './repository/mikro-orm-changelog.repository';

@MultiORMEntity('changelog', { mikroOrmRepository: () => MikroOrmChangelogRepository })
export class Changelog extends TenantOrganizationBaseEntity implements IChangelog {
	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	icon?: string;

	@ApiPropertyOptional({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	title?: string;

	@ApiProperty({ type: () => Date })
	@IsDate()
	@IsOptional()
	@Column()
	date?: Date;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column()
	content?: string;

	@ApiPropertyOptional({ type: () => Boolean })
	@IsBoolean()
	@Column({ type: Boolean, nullable: true })
	isFeature?: boolean;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	learnMoreUrl?: string;

	@ApiProperty({ type: () => String })
	@IsString()
	@IsOptional()
	@Column({ nullable: true })
	imageUrl?: string;
}
