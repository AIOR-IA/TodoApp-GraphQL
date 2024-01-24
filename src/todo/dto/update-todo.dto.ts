import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field( () => Int )
    @IsNumber()
    @Min(1)
    id:number;

    @Field( () => String, { description: 'What needs to be done', nullable: true})
    @IsString()
    @MaxLength(20)
    @IsNotEmpty()
    @IsOptional()
    description?: string;


    @Field( () => Boolean, { description: 'todo is done ?', nullable: true})
    @IsBoolean()
    @IsOptional()
    done?: boolean;
}