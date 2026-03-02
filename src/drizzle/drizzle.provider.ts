import { ConfigService } from "@nestjs/config";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";
import { DatabaseConfig, ServerConfig } from "../config/configuration";
import { Inject, Provider } from "@nestjs/common";
import * as schema from "./schema";

export const DrizzleAsyncProvider = "DrizzleAsyncProvider";

export const InjectDrizzle = () => Inject(DrizzleAsyncProvider);

export type DatabaseProvider = MySql2Database<typeof schema> & {
  $client: mysql.Pool;
};

export const drizzleProvider: Provider[] = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: (
      configService: ConfigService<ServerConfig>,
    ): DatabaseProvider => {
      const databaseConfig = configService.get<DatabaseConfig>("database")!;

      const client = mysql.createPool({
        uri: databaseConfig.url,
        connectionLimit: 5,
      });

      const db = drizzle(client, {
        schema,
        mode: "default",
      }) as DatabaseProvider;

      db.$client = client;

      return db;
    },
  },
];
