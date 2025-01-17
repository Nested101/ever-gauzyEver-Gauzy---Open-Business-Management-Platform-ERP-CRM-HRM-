import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { RouterModule } from '@nestjs/core';
import * as moment from 'moment';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { Invoice } from './invoice.entity';
import { CommandHandlers } from './commands';
import { EmailSendModule } from '../email-send/email-send.module';
import { EstimateEmailModule } from '../estimate-email/estimate-email.module';
import { TenantModule } from '../tenant/tenant.module';
import { PdfmakerService } from './pdfmaker.service';
import { OrganizationModule } from './../organization/organization.module';
import { UserModule } from './../user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
	imports: [
		RouterModule.register([{ path: '/invoices', module: InvoiceModule }]),
		TypeOrmModule.forFeature([Invoice]),
		MikroOrmModule.forFeature([Invoice]),
		EmailSendModule,
		EstimateEmailModule,
		TenantModule,
		UserModule,
		OrganizationModule,
		CqrsModule
	],
	controllers: [InvoiceController],
	providers: [
		InvoiceService,
		PdfmakerService,
		...CommandHandlers,
		{
			provide: 'MomentWrapper',
			useValue: moment
		}
	],
	exports: [TypeOrmModule, MikroOrmModule, InvoiceService, PdfmakerService]
})
export class InvoiceModule { }
