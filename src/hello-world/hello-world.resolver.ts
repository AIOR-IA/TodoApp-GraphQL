import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { description: 'Message return Hello World', name: 'hello' } )
    helloWolrd(): string {
        return 'Hi World'
    }

    @Query( () => Float, { name: 'randomNumber' } )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query( () => Int , { name: 'RandomFromZeroTo', description: 'From zero to argument TO'})
    getRandomFromZeroTo(  @Args('to', { nullable: true , type: () => Int}) to: number = 5): number {
        return Math.floor(Math.random() * to);
    }
}
