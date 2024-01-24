import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class CreateTodoInput {

    @Field( () => String)
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    description: string;


}