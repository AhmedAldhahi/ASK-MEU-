import Purchases from "@revenuecat/purchases";

// Initialize RevenueCat
Purchases.configure({
    apiKey: "your_public_api_key"
});

// Function to purchase a subscription
async function purchaseSubscription(plan) {
    try {
        const packageToBuy = plan === 'monthly' ? "monthly_package_id" : "yearly_package_id";
        const { purchaserInfo } = await Purchases.purchasePackage(packageToBuy);
        document.getElementById("status").innerHTML = "Subscription activated!";
    } catch (error) {
        document.getElementById("status").innerHTML = "Purchase failed: " + error;
    }
}

// Function to check subscription status
async function checkSubscriptionStatus() {
    try {
        const purchaserInfo = await Purchases.getCustomerInfo();
        if (purchaserInfo.entitlements.active["premium"]) {
            document.getElementById("status").innerHTML = "You have an active subscription!";
        } else {
            document.getElementById("status").innerHTML = "No active subscription.";
        }
    } catch (error) {
        document.getElementById("status").innerHTML = "Error fetching status: " + error;
    }
}
