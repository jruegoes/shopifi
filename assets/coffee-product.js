class CoffeeProduct {
  constructor() {
    this.quantityInputs = document.querySelectorAll('input[name="coffee_quantity"]');
    this.flavorInputs = document.querySelectorAll('input[name="coffee_flavor"]');
    this.purchaseInputs = document.querySelectorAll('input[name="purchase_type"]');
    this.giftItems = document.querySelectorAll('.gift-item');
    this.addToCartButton = document.querySelector('.coffee-add-to-cart');
    this.productForm = document.querySelector('form[data-type="add-to-cart-form"]');
    
    // Hidden inputs for properties
    this.flavorHiddenInput = document.querySelector('.coffee-flavor-input');
    this.purchaseHiddenInput = document.querySelector('.purchase-type-input');
    this.giftsHiddenInput = document.querySelector('.selected-gifts-input');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateGifts(); // Initialize with default quantity (1)
    this.updateHiddenInputs();
  }

  bindEvents() {
    // Quantity change events
    this.quantityInputs.forEach(input => {
      input.addEventListener('change', () => {
        this.updateGifts();
        this.updateQuantityInput();
      });
    });

    // Flavor change events
    this.flavorInputs.forEach(input => {
      input.addEventListener('change', () => {
        this.updateHiddenInputs();
      });
    });

    // Purchase type change events
    this.purchaseInputs.forEach(input => {
      input.addEventListener('change', () => {
        this.updateHiddenInputs();
        this.updatePricing();
      });
    });

    // Add to cart event
    if (this.productForm) {
      this.productForm.addEventListener('submit', (e) => {
        this.handleAddToCart(e);
      });
    }
  }

  updateGifts() {
    const selectedQuantity = document.querySelector('input[name="coffee_quantity"]:checked');
    if (!selectedQuantity) return;

    const quantity = parseInt(selectedQuantity.value);
    
    // Hide all gift items first
    this.giftItems.forEach(item => {
      item.style.display = 'none';
      item.classList.remove('active');
    });

    // Show relevant gifts based on quantity
    const activeGifts = [];
    
    if (quantity >= 1) {
      // Free shipping for all quantities
      const freeShippingItems = document.querySelectorAll('.gift-item[data-quantity="1"], .gift-item[data-quantity="2"], .gift-item[data-quantity="3"]');
      const freeShippingItem = Array.from(freeShippingItems).find(item => 
        item.querySelector('span').textContent.includes('Free Shipping')
      );
      if (freeShippingItem) {
        freeShippingItem.style.display = 'flex';
        freeShippingItem.classList.add('active');
        activeGifts.push('Free Shipping');
      }
    }

    if (quantity >= 2) {
      // Add measuring spoon and electric mixer
      const measuringSpoonItems = document.querySelectorAll('.gift-item[data-quantity="2"], .gift-item[data-quantity="3"]');
      const measuringSpoonItem = Array.from(measuringSpoonItems).find(item => 
        item.querySelector('span').textContent.includes('Measuring Spoon')
      );
      if (measuringSpoonItem && !measuringSpoonItem.classList.contains('active')) {
        measuringSpoonItem.style.display = 'flex';
        measuringSpoonItem.classList.add('active');
        activeGifts.push('Measuring Spoon');
      }

      const electricMixerItems = document.querySelectorAll('.gift-item[data-quantity="2"], .gift-item[data-quantity="3"]');
      const electricMixerItem = Array.from(electricMixerItems).find(item => 
        item.querySelector('span').textContent.includes('Electric Mixer')
      );
      if (electricMixerItem && !electricMixerItem.classList.contains('active')) {
        electricMixerItem.style.display = 'flex';
        electricMixerItem.classList.add('active');
        activeGifts.push('Electric Mixer');
      }
    }

    if (quantity >= 3) {
      // Add thermal mug
      const thermalMugItem = document.querySelector('.gift-item[data-quantity="3"]:not(.active)');
      if (thermalMugItem && thermalMugItem.querySelector('span').textContent.includes('Thermal Mug')) {
        thermalMugItem.style.display = 'flex';
        thermalMugItem.classList.add('active');
        activeGifts.push('Thermal Mug');
      }
    }

    // Update hidden input with active gifts
    if (this.giftsHiddenInput) {
      this.giftsHiddenInput.value = activeGifts.join(', ');
    }
  }

  updateQuantityInput() {
    const selectedQuantity = document.querySelector('input[name="coffee_quantity"]:checked');
    const quantityInput = document.querySelector('#Quantity-' + document.querySelector('[data-section]').dataset.section);
    
    if (selectedQuantity && quantityInput) {
      quantityInput.value = selectedQuantity.value;
    }
  }

  updateHiddenInputs() {
    // Update flavor
    const selectedFlavor = document.querySelector('input[name="coffee_flavor"]:checked');
    if (selectedFlavor && this.flavorHiddenInput) {
      this.flavorHiddenInput.value = selectedFlavor.value;
    }

    // Update purchase type
    const selectedPurchase = document.querySelector('input[name="purchase_type"]:checked');
    if (selectedPurchase && this.purchaseHiddenInput) {
      this.purchaseHiddenInput.value = selectedPurchase.value;
    }
  }

  updatePricing() {
    const selectedPurchase = document.querySelector('input[name="purchase_type"]:checked');
    const priceElements = document.querySelectorAll('.price');
    
    if (selectedPurchase && selectedPurchase.value === 'subscription') {
      // Apply 15% discount for subscription
      priceElements.forEach(priceEl => {
        const priceText = priceEl.querySelector('.price-item--regular');
        if (priceText) {
          const originalPrice = priceText.textContent;
          // Add subscription pricing logic here
          // This would typically involve updating the variant ID to a subscription variant
        }
      });
    }
  }

  handleAddToCart(e) {
    // Ensure all required options are selected
    const selectedFlavor = document.querySelector('input[name="coffee_flavor"]:checked');
    const selectedQuantity = document.querySelector('input[name="coffee_quantity"]:checked');
    const selectedPurchase = document.querySelector('input[name="purchase_type"]:checked');

    if (!selectedFlavor || !selectedQuantity || !selectedPurchase) {
      e.preventDefault();
      this.showError('Please select all options before adding to cart.');
      return;
    }

    // Update hidden inputs one final time
    this.updateHiddenInputs();
    
    // Add loading state
    if (this.addToCartButton) {
      this.addToCartButton.setAttribute('aria-disabled', true);
      this.addToCartButton.classList.add('loading');
      
      const loadingSpinner = this.addToCartButton.querySelector('.loading__spinner');
      if (loadingSpinner) {
        loadingSpinner.classList.remove('hidden');
      }
    }

    // The form will submit naturally, but we can add additional tracking here
    this.trackAddToCart({
      flavor: selectedFlavor.value,
      quantity: selectedQuantity.value,
      purchaseType: selectedPurchase.value,
      gifts: this.giftsHiddenInput ? this.giftsHiddenInput.value : ''
    });
  }

  showError(message) {
    // Create or update error message
    let errorEl = document.querySelector('.coffee-error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'coffee-error-message';
      errorEl.style.cssText = `
        background: #fee;
        color: #c33;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border: 1px solid #fcc;
      `;
      this.addToCartButton.parentNode.insertBefore(errorEl, this.addToCartButton);
    }
    errorEl.textContent = message;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorEl && errorEl.parentNode) {
        errorEl.parentNode.removeChild(errorEl);
      }
    }, 5000);
  }

  trackAddToCart(data) {
    // Analytics tracking for coffee product interactions
    if (typeof gtag !== 'undefined') {
      gtag('event', 'add_to_cart', {
        'event_category': 'Coffee Product',
        'event_label': `${data.flavor} - ${data.quantity} pieces - ${data.purchaseType}`,
        'custom_parameters': {
          'coffee_flavor': data.flavor,
          'coffee_quantity': data.quantity,
          'purchase_type': data.purchaseType,
          'included_gifts': data.gifts
        }
      });
    }

    // Shopify Analytics
    if (typeof Shopify !== 'undefined' && Shopify.analytics) {
      Shopify.analytics.track('Coffee Product Interaction', {
        flavor: data.flavor,
        quantity: data.quantity,
        purchaseType: data.purchaseType,
        gifts: data.gifts
      });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize on coffee product pages
  if (document.querySelector('.coffee-product')) {
    new CoffeeProduct();
  }
});

// Handle form submission success/error
document.addEventListener('cart:updated', () => {
  // Re-enable the add to cart button
  const addToCartButton = document.querySelector('.coffee-add-to-cart');
  if (addToCartButton) {
    addToCartButton.removeAttribute('aria-disabled');
    addToCartButton.classList.remove('loading');
    
    const loadingSpinner = addToCartButton.querySelector('.loading__spinner');
    if (loadingSpinner) {
      loadingSpinner.classList.add('hidden');
    }
  }
});

// Export for potential external use
window.CoffeeProduct = CoffeeProduct; 