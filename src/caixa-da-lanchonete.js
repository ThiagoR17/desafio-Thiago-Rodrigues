class CaixaDaLanchonete {
    cardapio = {
        cafe: { descricao: "Café", valor: 3.00 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.50, extras: ['cafe'] },
        suco: { descricao: "Suco Natural", valor: 6.20 },
        sanduiche: { descricao: "Sanduíche", valor: 6.50, extras: ['queijo'] },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
    };

    formasPagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasPagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        const itensPedido = {};

        for (const itemInfo of itens) {
            const [itemCodigo, quantidade] = itemInfo.split(',');

            if (parseInt(quantidade) <= 0) {
                return "Quantidade inválida!";
            }

            const item = this.cardapio[itemCodigo];

            if (!item) {
                return "Item inválido!";
            }

            if (!item.extras) {
                itensPedido[itemCodigo] = true;
            }

            total += item.valor * parseInt(quantidade);
        }

        for (const itemInfo of itens) {
            const [itemCodigo] = itemInfo.split(',');
            const item = this.cardapio[itemCodigo];
        
            if (item.extras) {
                for (const extraCodigo of item.extras) {
                    if (!itensPedido[extraCodigo]) {
                        const itemPrincipalDescricao = this.cardapio[extraCodigo].descricao;
                        const itemExtraDescricao = this.cardapio[itemCodigo].descricao;  
                        return `${itemExtraDescricao} não pode ser pedido sem o ${itemPrincipalDescricao}`;
                    }
                }
            }
        }

        if (metodoDePagamento === 'dinheiro') {
            total *= 0.95;
        } else if (metodoDePagamento === 'credito') {
            total *= 1.03;
        }

        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };
