-- CreateTable
CREATE TABLE `subcategorias` (
    `IDsubcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(100) NOT NULL,
    `IDCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`IDsubcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `IDCategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_categoria` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`IDCategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `IDProduto` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo_produto` VARCHAR(100) NOT NULL,
    `fabricante_produto` VARCHAR(100) NOT NULL,
    `preco_produto` DECIMAL(10, 2) NOT NULL,
    `qtdDisponivel_produto` INTEGER NOT NULL,
    `IDSubcategoria` INTEGER NOT NULL,

    PRIMARY KEY (`IDProduto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemcompra` (
    `IDItemCompra` INTEGER NOT NULL AUTO_INCREMENT,
    `IDCompras` INTEGER NOT NULL,
    `IDProduto` INTEGER NOT NULL,
    `precoUnitario` DECIMAL(10, 2) NOT NULL,
    `qtd_itemCompra` INTEGER NOT NULL,
    `NSerie` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`IDItemCompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `IDCliente` INTEGER NOT NULL AUTO_INCREMENT,
    `CPF_cliente` VARCHAR(11) NOT NULL,
    `nomeCompleto_cliente` VARCHAR(100) NOT NULL,
    `NCelular_cliente` VARCHAR(15) NOT NULL,
    `email_cliente` VARCHAR(100) NOT NULL,
    `dataNascimento_cliente` DATE NOT NULL,
    `Enderecos_cliente` TEXT NOT NULL,

    PRIMARY KEY (`IDCliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `formapagamento` (
    `IDPagamento` INTEGER NOT NULL AUTO_INCREMENT,
    `formasPagamento` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`IDPagamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compras` (
    `IDCompras` INTEGER NOT NULL AUTO_INCREMENT,
    `enderecoEnvio_compra` TEXT NOT NULL,
    `descontoAplicado` DECIMAL(5, 2) NULL,
    `total_compra` DECIMAL(10, 2) NOT NULL,
    `dataHora` DATE NOT NULL,
    `IDCliente` INTEGER NOT NULL,
    `IDPagamento` INTEGER NOT NULL,

    PRIMARY KEY (`IDCompras`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_IDCategoria_fkey` FOREIGN KEY (`IDCategoria`) REFERENCES `categoria`(`IDCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `produtos_IDSubcategoria_fkey` FOREIGN KEY (`IDSubcategoria`) REFERENCES `subcategorias`(`IDsubcategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemcompra` ADD CONSTRAINT `itemcompra_IDCompras_fkey` FOREIGN KEY (`IDCompras`) REFERENCES `compras`(`IDCompras`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemcompra` ADD CONSTRAINT `itemcompra_IDProduto_fkey` FOREIGN KEY (`IDProduto`) REFERENCES `produtos`(`IDProduto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_IDCliente_fkey` FOREIGN KEY (`IDCliente`) REFERENCES `clientes`(`IDCliente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compras` ADD CONSTRAINT `compras_IDPagamento_fkey` FOREIGN KEY (`IDPagamento`) REFERENCES `formapagamento`(`IDPagamento`) ON DELETE RESTRICT ON UPDATE CASCADE;
