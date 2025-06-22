function productPage() {
    return {
        sidebarOpen: window.innerWidth > 768,
        isModalOpen: false,
        isDeleteModalOpen: false,
        editingProduct: false,
        searchQuery: '',
        selectedCategory: '',
        currentPage: 1,
        itemsPerPage: 10,
        currentProduct: {
            id: '',
            name: '',
            sku: '',
            category: '',
            price: 0,
            stock: 0,
            status: 'Published',
            description: '',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
        },
        products: [
            {
                id: '1',
                name: 'Wireless Headphones',
                sku: 'WH-1000XM4',
                category: 'Electronics',
                price: 349.99,
                stock: 25,
                status: 'Published',
                description: 'Industry-leading noise cancellation with 30-hour battery life.',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '2',
                name: 'Smart Watch',
                sku: 'SW-GT3',
                category: 'Electronics',
                price: 199.99,
                stock: 42,
                status: 'Published',
                description: 'Track your fitness and stay connected with this smart watch.',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '3',
                name: 'Leather Wallet',
                sku: 'LW-BLK',
                category: 'Accessories',
                price: 49.99,
                stock: 18,
                status: 'Published',
                description: 'Genuine leather wallet with multiple card slots.',
                image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '4',
                name: 'Running Shoes',
                sku: 'RS-2023',
                category: 'Footwear',
                price: 129.99,
                stock: 0,
                status: 'Draft',
                description: 'Lightweight running shoes with superior cushioning.',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '5',
                name: 'Bluetooth Speaker',
                sku: 'BS-X500',
                category: 'Electronics',
                price: 89.99,
                stock: 7,
                status: 'Published',
                description: 'Portable speaker with 20-hour battery life.',
                image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '6',
                name: 'Coffee Mug',
                sku: 'CM-WHT',
                category: 'Kitchen',
                price: 12.99,
                stock: 56,
                status: 'Published',
                description: 'Ceramic coffee mug with comfortable handle.',
                image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '7',
                name: 'Backpack',
                sku: 'BP-TRV',
                category: 'Accessories',
                price: 79.99,
                stock: 14,
                status: 'Published',
                description: 'Durable backpack with laptop compartment.',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '8',
                name: 'Desk Lamp',
                sku: 'DL-LED',
                category: 'Home',
                price: 39.99,
                stock: 23,
                status: 'Published',
                description: 'Adjustable LED desk lamp with multiple brightness levels.',
                image: 'https://images.unsplash.com/photo-1580494767366-e6bd9a840b0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '9',
                name: 'Yoga Mat',
                sku: 'YM-PRO',
                category: 'Fitness',
                price: 29.99,
                stock: 31,
                status: 'Published',
                description: 'Non-slip yoga mat with carrying strap.',
                image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            },
            {
                id: '10',
                name: 'Water Bottle',
                sku: 'WB-750',
                category: 'Fitness',
                price: 24.99,
                stock: 0,
                status: 'Archived',
                description: 'Insulated stainless steel water bottle.',
                image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
            }
        ],
        categories: ['Electronics', 'Accessories', 'Footwear', 'Kitchen', 'Home', 'Fitness'],
        init() {
            this.handleResize();
            window.addEventListener('resize', this.handleResize.bind(this));
        },
        handleResize() {
            this.sidebarOpen = window.innerWidth > 768;
        },
        get filteredProducts() {
            let filtered = this.products;

            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(product =>
                    product.name.toLowerCase().includes(query) ||
                    product.sku.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query)
                );
            }

            // Filter by category
            if (this.selectedCategory) {
                filtered = filtered.filter(product =>
                    product.category === this.selectedCategory
                );
            }

            return filtered;
        },
        get totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        },
        get visiblePages() {
            const range = 2; // Number of pages to show before and after current page
            let start = Math.max(1, this.currentPage - range);
            let end = Math.min(this.totalPages, this.currentPage + range);

            // Adjust if we're at the start or end
            if (this.currentPage - range < 1) {
                end = Math.min(end + (range - this.currentPage + 1), this.totalPages);
            }
            if (this.currentPage + range > this.totalPages) {
                start = Math.max(start - (this.currentPage + range - this.totalPages), 1);
            }

            const pages = [];
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            return pages;
        },
        get paginatedProducts() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredProducts.slice(start, end);
        },
        filterProducts() {
            this.currentPage = 1; // Reset to first page when filtering
        },
        openAddProductModal() {
            this.editingProduct = false;
            this.currentProduct = {
                id: '',
                name: '',
                sku: '',
                category: '',
                price: 0,
                stock: 0,
                status: 'Published',
                description: '',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
            };
            this.isModalOpen = true;
        },
        editProduct(product) {
            this.editingProduct = true;
            this.currentProduct = { ...product };
            this.isModalOpen = true;
        },
        saveProduct() {
            if (this.editingProduct) {
                // Update existing product
                const index = this.products.findIndex(p => p.id === this.currentProduct.id);
                if (index !== -1) {
                    this.products[index] = { ...this.currentProduct };
                }
            } else {
                // Add new product
                this.currentProduct.id = (this.products.length + 1).toString();
                this.products.unshift({ ...this.currentProduct });
            }
            this.isModalOpen = false;
        },
        confirmDelete(product) {
            this.currentProduct = { ...product };
            this.isDeleteModalOpen = true;
        },
        deleteProduct() {
            this.products = this.products.filter(p => p.id !== this.currentProduct.id);
            this.isDeleteModalOpen = false;
        }
    }
}            
