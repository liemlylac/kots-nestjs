# ConfigModule
Configuration for environment or general setting.

## ConfigService from '@nestjs/config'
ConfigModule from '@nestjs/config' as Global module.
Using ConfigService by inject in the constructor.

```
construct(
    private readonly configService: ConfigService,
) {/*...*/}
```

## Usage
Use by inject
```
this.configService.get<number>('db.port');
```

Use in main.js
```
const app = await NestFactory.create(AppModule);
const configService = app.get(ConfigService);

/*...*/

await app.listen(configService.get<number>('port'));
```


## Adding config
### File convention
Create a new file `<group-config>.config.ts`. Example `example.config.ts` with content:

```
export default () => ({
  example: {
    port: process.env.PORT || 3306,
  }
})
```

### Define in ConfigModule
Open file `config.module.ts`, adding config to `ConfigModule.forRoot(...)` like this:

```
ConfigModule.forRoot({
  isGlobal: true,
  load: [generalConfig, exampleConfig],
}),
```

Remember import exampleConfig:
```
import exampleConfig from './example.config.ts';
```

### Get example config value
Get config from example config
```
const port = this.configService.get<number>('example.port');
```

Remember inject configService in the construct:
```
construct(
    private readonly configService: ConfigService,
) {/*...*/}
```
