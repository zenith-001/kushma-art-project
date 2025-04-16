// Donation system
document.addEventListener('DOMContentLoaded', () => {
    const donationForm = document.getElementById('donationForm');
    const donateOptions = document.querySelectorAll('.donate-option');
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    let selectedAmount = 0;
    let selectedMethod = 'esewa';
    
    // Handle donation amount selection
    donateOptions.forEach(option => {
        option.addEventListener('click', function() {
            donateOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('custom-amount')) {
                const input = this.querySelector('input');
                input.focus();
                input.addEventListener('input', (e) => {
                    selectedAmount = parseInt(e.target.value) || 0;
                });
            } else {
                selectedAmount = parseInt(this.dataset.amount);
            }
        });
    });
    
    // Handle payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            selectedMethod = this.dataset.method;
        });
    });
    
    // Handle form submission
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (selectedAmount <= 0) {
            alert('Please select a valid donation amount');
            return;
        }
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            amount: selectedAmount,
            method: selectedMethod
        };
        
        try {
            const response = await fetch('/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                // Redirect to payment gateway based on selected method
                if (selectedMethod === 'esewa') {
                    initiateEsewaPayment(result.paymentUrl);
                } else if (selectedMethod === 'khalti') {
                    initiateKhaltiPayment(result.paymentUrl);
                } else {
                    showCardPaymentForm(result);
                }
            } else {
                throw new Error(result.message || 'Payment failed');
            }
        } catch (error) {
            console.error('Donation error:', error);
            alert('Payment failed: ' + error.message);
        }
    });
    
    function initiateEsewaPayment(url) {
        // Implement eSewa payment integration
        window.location.href = url;
    }
    
    function initiateKhaltiPayment(url) {
        // Implement Khalti payment integration
        window.location.href = url;
    }
    
    function showCardPaymentForm(data) {
        // Show card payment form
        alert(`Card payment would be processed for ${data.amount} NPR`);
    }
});