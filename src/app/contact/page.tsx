
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="flex-grow bg-background">
                <section className="relative py-24 sm:py-32 text-center bg-secondary">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-poppins font-bold tracking-tight sm:text-5xl lg:text-6xl">Get in Touch</h1>
                        <p className="mt-6 text-lg max-w-3xl mx-auto text-muted-foreground">
                            Have a question, suggestion, or just want to say hello? We’d love to hear from you.
                        </p>
                    </div>
                </section>

                <section className="py-16 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8">
                                <h2 className="text-3xl font-poppins font-bold">Contact Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary text-primary-foreground rounded-full">
                                            <Mail className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Email</h3>
                                            <p className="text-muted-foreground">hello@tourific.app</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary text-primary-foreground rounded-full">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Phone</h3>
                                            <p className="text-muted-foreground">(123) 456-7890</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary text-primary-foreground rounded-full">
                                            <MapPin className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Office</h3>
                                            <p className="text-muted-foreground">123 Adventure Ave, Wanderlust City</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                 <h2 className="text-3xl font-poppins font-bold">Send us a Message</h2>
                                <form className="space-y-6">
                                    <Input type="text" placeholder="Your Name" className="text-base" />
                                    <Input type="email" placeholder="Your Email" className="text-base" />
                                    <Textarea placeholder="Your Message" rows={6} className="text-base" />
                                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90">
                                        Send Message <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
