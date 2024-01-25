import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/inputs/todo.entity';
import { TodoService } from './todo.service';
import { Param } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.dto';
import { UpdateTodoInput } from './dto/update-todo.dto';
import { StatusArgs } from './dto/args/status.args';
import { AggregationType } from './types/aggregations.type';

@Resolver( () => Todo )
export class TodoResolver {

    constructor(
        private readonly todoService:TodoService
    ) {}

    @Query( () => [Todo], { name: 'AllTodos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] {
        return this.todoService.findAll(statusArgs);
    }

    @Query( () => Todo, { name: 'todo'})
    findOne(@Args('id', { type: () => Int }) id: number ) {
        return this.todoService.findOne( id )
    }

    @Query( () => Int, { name: 'countTotalTodos'})
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query( () => Int , { name: 'CompletedTodos'})
    CompletedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query( () => Int , { name: 'PendingTodos'})
    PendingTodos(): number {
        return this.todoService.pendingTodos;
    }

    @Query( () => AggregationType , { name: 'Aggregation'})
    Aggregation():AggregationType {
        return {
            completed : this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            total: this.todoService.totalTodos,
            totalCompleted: this.todoService.totalTodos

        }
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
