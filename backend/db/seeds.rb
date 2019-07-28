# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Comment.delete_all
Post.delete_all

dog_boarding_kennel = Post.create(posted: Time.now.strftime("%m/%d/%Y"),
                                  title: "Dog Boarding Kennel",
                                  description: "We have recently opened a dog boarding facility near Murphy Creek in Aurora. We have nice climate controlled indoor kennels with cots, and we have two private turf yards for your dogs to play in. We have an excellent and very experienced staff. This this owner operated, and we live on the premises. Our rate is $30/per night per dog.",
                                  image: "https://images.craigslist.org/00x0x_d2JbHLwsGJM_600x450.jpg")

Comment.create(post: dog_boarding_kennel, content: "What is your phone number")
Comment.create(post: dog_boarding_kennel, content: "720-939-2595")
Comment.create(post: dog_boarding_kennel, content: "You can find more details at http://murphycreekpetresort.com/")

bike_for_sale = Post.create(posted: Time.now.strftime("%m/%d/%Y"),
                            title: '26" Folding Mountain Bike Hybrid Bike 7 Speeds Full Suspension - $249',
                            description: 'We got this bike to travel with by air or road trips. This is brand new 26'' folding bike (never used), which is fashionably designed for comfortable riding. Riding with style and convenience, this fashionable designed bike can be easily folded and storage or transportation (see pictures). You can also purchase a travel bag for $27 online (bag size L38"xW14"xH29") or if you have a box with these dimensions. This bike is perfect for commuting to work, or riding in parks as well as in camping ground, where it can be easily folded and stored in compact small spaces like the trunk of your vehicle. Pictures included shows the bike folded for easy transport and the bike in travel bag is accepted by all major airlines. Please check with your airline before traveling. For example, if you have large distance to explore and cover on your next trip to Europe this bike is the best option. Paid $299 marked down to sell fast. Please send me an email if you have any questions.',
                            image: "https://images.craigslist.org/00h0h_hupFBIUT1wP_600x450.jpg")
Comment.create(post: bike_for_sale, content: "What is your email address?")
Comment.create(post: bike_for_sale, content: "bob@gmail.com")
Comment.create(post: bike_for_sale, content: "Is this available for delivery?")

sofa_for_sale = Post.create(posted: Time.now.strftime("%m/%d/%Y"),
                            title: 'Crate & Barrel Large Couch - $350 (Parker)',
                            description: 'Getting prepared for a big move and have to let this go. Couch has been up kept, no holes or excessive stains. We have owned the couch for a year and a half.',
                            image: 'https://images.craigslist.org/00909_g01WgJRU6c9_600x450.jpg')

Comment.create(post: sofa_for_sale, content: 'Can I drop by to take a look at it?')
Comment.create(post: sofa_for_sale, content: 'Yes. Call me at 720-333-9923')