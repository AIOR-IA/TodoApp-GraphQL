import { ArgsType, Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";

@ArgsType()
export class StatusArgs {

    @Field( () => Boolean, { nullable: true})
    @IsBoolean()
    @IsOptional()
    isFinished?: boolean;

}