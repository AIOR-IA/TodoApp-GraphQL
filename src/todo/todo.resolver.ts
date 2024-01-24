import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/inputs/todo.entity';
import { TodoService } from './todo.service';
import { Param } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService:TodoService
    ) {}

    @Query( () => [Todo], { name: 'AllTodos' })
    findAll(
        @Args('statusArgs')
    ): Todo[] {
        return this.todoService.findAll();
    }

    @Query( () => Todo, { name: 'todo'})
    findOne(@Args('id', { type: () => Int }) id: number ) {
        return this.todoService.findOne( id )
    }

    @Mutation( () => Todo, { name: 'createTodo'})
    createTodo(
        @Args('createTodoInput') createTodoInput : CreateTodoInput
    ){
        return this.todoService.create(createTodoInput);
    }

    @Mutation( () => Todo, { name: 'updateTodo'})
    updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput ){
        return this.todoService.update( updateTodoInput );
    }

    @Mutation( () => Todo, { name: 'deleteTodo' } )
    deleteTodo(@Args('id', {type: () => Int }) id : number ){
        return this.todoService.delete( id );
    }
}
