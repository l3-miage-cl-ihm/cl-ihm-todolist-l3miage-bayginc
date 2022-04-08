

interface TodoListAbstraction{
    tailleListe(n:number): this;
    ajouterElement(phrase:string):this;
}

class TodoListAbstract implements TodoListAbstraction{

    tailleListe(n:number): this {
        cy.get('li > app-todo-item').should('have.length', n);
        return this;
    }

    ajouterElement(phrase: string): this {
        cy.get('.new-todo').type(`${phrase}`).type('{enter}');
        return this;
    }
   
}

export const outils = new TodoListAbstract;