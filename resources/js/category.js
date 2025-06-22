document.addEventListener('alpine:init', () => {
    Alpine.data('categoryPage', function () {
        return {
            sidebarOpen: window.innerWidth > 768,
            isModalOpen: false,
            isDeleteModalOpen: false,
            editingCategory: false,
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 10,
            currentCategory: {
                id: '',
                name: '',
                slug: '',
                description: '',
                status: 'Active',
                productCount: 0
            },
            categories: [
                {
                    id: '1',
                    name: 'Electronics',
                    slug: 'electronics',
                    description: 'Electronic devices and gadgets',
                    status: 'Active',
                    productCount: 42
                },
                {
                    id: '2',
                    name: 'Clothing',
                    slug: 'clothing',
                    description: 'Men and women clothing',
                    status: 'Active',
                    productCount: 36
                },
                {
                    id: '3',
                    name: 'Home & Garden',
                    slug: 'home-garden',
                    description: 'Home decoration and garden tools',
                    status: 'Active',
                    productCount: 28
                },
                {
                    name: 'Sports',
                    slug: 'sports',
                    description: 'Sports equipment and accessories',
                    status: 'Active',
                    productCount: 19
                },
                {
                    id: '5',
                    name: 'Beauty',
                    slug: 'beauty',
                    description: 'Beauty and personal care products',
                    status: 'Active',
                    productCount: 31
                },
                {
                    id: '6',
                    name: 'Toys',
                    slug: 'toys',
                    description: 'Toys for children of all ages',
                    status: 'Active',
                    productCount: 15
                },
                {
                    id: '7',
                    name: 'Books',
                    slug: 'books',
                    description: 'Various books and magazines',
                    status: 'Inactive',
                    productCount: 8
                },
                {
                    id: '8',
                    name: 'Food & Beverage',
                    slug: 'food-beverage',
                    description: 'Food and drink products',
                    status: 'Active',
                    productCount: 23
                },
                {
                    id: '9',
                    name: 'Health',
                    slug: 'health',
                    description: 'Health and wellness products',
                    status: 'Active',
                    productCount: 17
                },
                {
                    id: '10',
                    name: 'Automotive',
                    slug: 'automotive',
                    description: 'Car accessories and parts',
                    status: 'Active',
                    productCount: 12
                }
            ],
            init() {
                this.handleResize();
                window.addEventListener('resize', this.handleResize.bind(this));
            },
            handleResize() {
                this.sidebarOpen = window.innerWidth > 768;
            },
            get filteredCategories() {
                if (!this.searchQuery) {
                    return this.categories;
                }
                const query = this.searchQuery.toLowerCase();
                return this.categories.filter(category =>
                    category.name.toLowerCase().includes(query) ||
                    category.slug.toLowerCase().includes(query) ||
                    category.description.toLowerCase().includes(query)
                );
            },
            get totalPages() {
                return Math.ceil(this.filteredCategories.length / this.itemsPerPage);
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
            get paginatedCategories() {
                const start = (this.currentPage - 1) * this.itemsPerPage;
                const end = start + this.itemsPerPage;
                return this.filteredCategories.slice(start, end);
            },
            filterCategories() {
                this.currentPage = 1; // Reset to first page when filtering
            },
            openAddCategoryModal() {
                this.editingCategory = false;
                this.currentCategory = {
                    id: '',
                    name: '',
                    slug: '',
                    description: '',
                    status: 'Active',
                    productCount: 0
                };
                this.isModalOpen = true;
            },
            editCategory(category) {
                this.editingCategory = true;
                this.currentCategory = { ...category };
                this.isModalOpen = true;
            },
            saveCategory() {
                if (this.editingCategory) {
                    // Update existing category
                    const index = this.categories.findIndex(c => c.id === this.currentCategory.id);
                    if (index !== -1) {
                        this.categories[index] = { ...this.currentCategory };
                    }
                } else {
                    // Add new category
                    this.currentCategory.id = (this.categories.length + 1).toString();
                    this.currentCategory.slug = this.currentCategory.name.toLowerCase().replace(/ /g, '-');
                    this.categories.unshift({ ...this.currentCategory });
                }
                this.isModalOpen = false;
            },
            confirmDelete(category) {
                this.currentCategory = { ...category };
                this.isDeleteModalOpen = true;
            },
            deleteCategory() {
                this.categories = this.categories.filter(c => c.id !== this.currentCategory.id);
                this.isDeleteModalOpen = false;
            }
        };
    });
})