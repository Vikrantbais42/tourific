
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PrivacyPolicyPage() {
    return (
        <>
            <Header />
            <main className="flex-grow bg-background py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-poppins font-bold tracking-tight sm:text-5xl">Privacy Policy</h1>
                            <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                        
                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <p>
                                Welcome to Tourific ("we", "our", "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">1. Information We Collect</h2>
                            <p>
                                We may collect information about you in a variety of ways. The information we may collect includes:
                            </p>
                            <ul>
                                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and demographic information, that you voluntarily give to us when you register with the application.</li>
                                <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the application, such as your IP address, your browser type, and your access times.</li>
                                <li><strong>Data From AI Interactions:</strong> We collect the inputs you provide to our AI models (like tour preferences, locations, and budget) to generate itineraries.</li>
                            </ul>

                            <h2 className="font-poppins font-semibold text-foreground">2. Use of Your Information</h2>
                            <p>
                                Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:
                            </p>
                            <ul>
                                <li>Create and manage your account.</li>
                                <li>Generate personalized tour itineraries and travel suggestions.</li>
                                <li>Email you regarding your account or order.</li>
                                <li>Improve the efficiency and operation of the application.</li>
                                <li>Monitor and analyze usage and trends to improve your experience.</li>
                            </ul>

                            <h2 className="font-poppins font-semibold text-foreground">3. Disclosure of Your Information</h2>
                            <p>
                                We do not share your personal information with third parties except as described in this Privacy Policy. We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                            </p>
                            <ul>
                                <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                                <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, and hosting services.</li>
                            </ul>

                             <h2 className="font-poppins font-semibold text-foreground">4. Security of Your Information</h2>
                            <p>
                                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                            </p>
                            
                             <h2 className="font-poppins font-semibold text-foreground">5. Changes to This Privacy Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">6. Contact Us</h2>
                            <p>
                                If you have questions or comments about this Privacy Policy, please contact us at hello@tourific.app.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
