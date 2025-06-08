# Coffee Product Template Setup Guide

## Overview

This custom Shopify template provides specialized functionality for coffee products with:
- Flavor selection (Classic, Mocha, Vanilla)
- Quantity-based dynamic gifts
- Subscription vs. one-time purchase options
- Custom styling optimized for coffee branding

## Files Created

### 1. Template Files
- `templates/product.coffee.json` - Custom product template for coffee items
- `sections/main-product-coffee.liquid` - Coffee-specific product section

### 2. Assets
- `assets/section-coffee-product.css` - Custom styling
- `assets/coffee-product.js` - Interactive functionality

### 3. Documentation
- `COFFEE_PRODUCT_SETUP.md` - This setup guide

## How to Apply to Products

### Method 1: Individual Product Assignment
1. Go to **Admin > Products**
2. Select a coffee product
3. Scroll to **Search engine listing preview**
4. Click **Edit website SEO**
5. In the **Search engine listing preview** section, set:
   - **Template suffix**: `coffee`

### Method 2: Bulk Assignment via Product Tags
1. Add tag `coffee-product` to all coffee products
2. The template will automatically detect coffee products

### Method 3: Product Type Assignment
If all coffee products use the same product type:
1. Set product type to "Coffee" for all coffee products
2. Template will auto-apply based on product type

## Features Explained

### Flavor Selection
- **Options**: Classic, Mocha, Vanilla
- **Storage**: Saved as line item property `Coffee Flavor`
- **Styling**: Custom radio buttons with coffee-themed colors

### Dynamic Gifts System
Gifts automatically update based on quantity:

| Quantity | Gifts Included |
|----------|----------------|
| 1 piece  | Free Shipping |
| 2 pieces | Free Shipping + Measuring Spoon + Electric Mixer |
| 3 pieces | All above + Thermal Mug |

### Purchase Options
- **One-Time Purchase**: Standard pricing
- **Subscription**: 15% discount (requires Shopify Subscriptions app)

### Data Collection
All selections are stored as line item properties:
- `Coffee Flavor`: Selected flavor
- `Purchase Type`: onetime/subscription
- `Selected Gifts`: Comma-separated list of included gifts

## Styling Customization

### Color Scheme
The template uses CSS custom properties for easy theming:

```css
.coffee-product {
  --coffee-primary: #8B5A2B;    /* Coffee brown */
  --coffee-secondary: #D2B48C;  /* Light tan */
  --coffee-accent: #F4F4F4;     /* Light gray */
  --coffee-text: #2C1810;       /* Dark brown */
  --coffee-border: #E8E0D7;     /* Beige border */
}
```

### Responsive Design
- Mobile-first approach
- Stacked layout on mobile devices
- Touch-friendly interactive elements

## Technical Integration

### Form Submission
The template integrates with Shopify's standard cart system:
- Uses hidden inputs for line item properties
- Maintains compatibility with cart drawers
- Supports dynamic checkout buttons

### Analytics Tracking
Built-in tracking for:
- Google Analytics (gtag)
- Shopify Analytics
- Custom coffee product interactions

### Performance
- Lazy loading for non-critical assets
- Efficient DOM manipulation
- Minimal JavaScript footprint

## Subscription Integration

To enable subscription functionality:

1. **Install Shopify Subscriptions App**
2. **Create Subscription Variants**:
   - Duplicate existing variants
   - Add to subscription group
   - Apply 15% discount

3. **Update JavaScript**:
   - Modify `updatePricing()` method
   - Map subscription option to correct variant ID

## Testing Checklist

- [ ] Flavor selection updates correctly
- [ ] Quantity changes trigger gift updates
- [ ] Purchase type selection works
- [ ] Add to cart includes all properties
- [ ] Mobile responsiveness
- [ ] Gift animations function properly
- [ ] Form validation prevents empty submissions

## Troubleshooting

### Common Issues

**Gifts not updating**: Check that quantity radio buttons have correct `data-quantity` attributes

**Styling not applied**: Ensure `section-coffee-product.css` is loading correctly

**JavaScript errors**: Verify all required elements exist in DOM before initialization

**Properties not saving**: Check hidden input names match form property names

### Debug Mode
Add `?debug=1` to product URL to enable console logging:

```javascript
const debugMode = new URLSearchParams(window.location.search).get('debug');
if (debugMode) {
  console.log('Coffee product data:', data);
}
```

## Customization Examples

### Adding New Flavors
1. Update flavor selector in `main-product-coffee.liquid`
2. Add corresponding CSS styles
3. Update validation in `coffee-product.js`

### Modifying Gift Logic
Edit the `updateGifts()` method in `coffee-product.js`:

```javascript
if (quantity >= 4) {
  // Add premium gift for 4+ pieces
  activeGifts.push('Premium Coffee Grinder');
}
```

### Custom Subscription Pricing
Implement dynamic pricing updates:

```javascript
updatePricing() {
  const subscription = document.querySelector('input[name="purchase_type"]:checked');
  if (subscription && subscription.value === 'subscription') {
    this.applySubscriptionDiscount(0.15); // 15% off
  }
}
```

## Support

For technical support or customization requests:
1. Check existing Shopify theme documentation
2. Review browser console for JavaScript errors
3. Validate HTML markup in theme inspector
4. Test in different browsers and devices

---

*This template follows Shopify theme development best practices and is compatible with the Dawn theme structure.* 