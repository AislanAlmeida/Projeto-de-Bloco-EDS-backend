export interface IRepository<T>{
    
    criar(item: T): Promise<T|undefined>;
    atualizar(id:number,item:T): Promise<boolean>;
    excluir(id:number): Promise<boolean>;
    obterLista():Promise<Array<T>>;
    obterItem(id:number):Promise<T|undefined>;
}