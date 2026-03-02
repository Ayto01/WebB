/* eslint-disable prettier/prettier */
import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus,
    Param, ParseIntPipe, Post, Put, Query
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto, UpdateTransactionDto } from "./transaction.dto";
import { PaginationQuery } from "../common/pagination.dto";
import { CurrentUser } from "../auth/decorators/currentUser.decorator";
import type { Session } from "../types/auth";

import { TransactionListResponseDto, TransactionResponseDto } from "./transaction.response.dto";

@ApiTags("Transactions")
@ApiBearerAuth()
@ApiResponse({ status: 401, description: "Unauthorized - you need to be signed in" })
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiResponse({ status: 200, description: "Get transactions", type: TransactionListResponseDto })
  @Get()
  getAll(@Query() pagination: PaginationQuery, @CurrentUser() user: Session) {
    return this.transactionsService.getAll(pagination, user);
  }

  @ApiParam({ name: "id", example: 1, description: "Transaction id" })
  @ApiResponse({ status: 200, description: "Get transaction by id", type: TransactionResponseDto })
  @ApiResponse({ status: 404, description: "Transaction not found" })
  @Get(":id")
  getById(@Param("id", ParseIntPipe) id: number, @CurrentUser() user: Session) {
    return this.transactionsService.getById(id, user);
  }

  @ApiResponse({ status: 201, description: "Create transaction", type: TransactionResponseDto })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateTransactionDto, @CurrentUser() user: Session) {
    return this.transactionsService.create(dto, user);
  }

  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Update transaction", type: TransactionResponseDto })
  @ApiResponse({ status: 400, description: "Invalid input data" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Transaction not found" })
  @Put(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTransactionDto,
    @CurrentUser() user: Session,
  ) {
    return this.transactionsService.updateById(id, dto, user);
  }

  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 204, description: "Delete transaction" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Transaction not found" })
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id", ParseIntPipe) id: number, @CurrentUser() user: Session) {
    return this.transactionsService.deleteById(id, user);
  }
}
