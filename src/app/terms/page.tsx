
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function TermsAndConditionsPage() {
    return (
        <>
            <Header />
            <main className="flex-grow bg-background py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-poppins font-bold tracking-tight sm:text-5xl">Terms and Conditions</h1>
                            <p className="mt-4 text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                        
                        <div className="prose prose-lg max-w-none text-muted-foreground">
                            <p>
                                Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the Tourific application (the "Service") operated by Tourific ("us", "we", or "our").
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">2. Use of the Service</h2>
                            <p>
                                Our Service provides AI-generated tour itineraries. This is not a travel booking service. All suggestions, including activities, flights, and costs, are for informational purposes only. You are responsible for verifying all information and making your own bookings. We are not liable for any inaccuracies or issues arising from the suggestions provided.
                            </p>
                            
                            <h2 className="font-poppins font-semibold text-foreground">3. User Conduct</h2>
                            <p>
                                You agree not to use the Service to:
                            </p>
                            <ul>
                                <li>Violate any local, state, national, or international law.</li>
                                <li>Transmit any material that is abusive, harassing, tortious, defamatory, vulgar, pornographic, obscene, libelous, or invasive of another's privacy.</li>
                                <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
                            </ul>

                            <h2 className="font-poppins font-semibold text-foreground">4. Intellectual Property</h2>
                            <p>
                                The Service and its original content, features, and functionality are and will remain the exclusive property of Tourific and its licensors.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">5. Disclaimer of Warranties</h2>
                            <p>
                                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">6. Limitation of Liability</h2>
                            <p>
                                In no event shall Tourific, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">7. Changes</h2>
                            <p>
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                            </p>

                            <h2 className="font-poppins font-semibold text-foreground">8. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at hello@tourific.app.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
