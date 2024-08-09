'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export function NavMenu() {
  return (
    <NavigationMenu className="">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="https://pinnaclepartnerships.com/"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="https://pinnaclepartnerships.com/about-2/"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger className="relative font-satoshi text-body   font-medium flex items-center justify-center    hover:text-primary ">
            Hire Partner
          </NavigationMenuTrigger>
          <NavigationMenuContent className="  dark:bg-boxdark absolute font-satoshi mt-2.5 w-56 rounded-sm border  border-whiten dark:border-slate-700 bg-white shadow-default">
            <ul className="grid gap-2 p-6 md:w-[200px] lg:w-[400px] ">
              <ListItem
                className="dark:hover:bg-meta-4 dark:text-white"
                href="https://pinnaclepartnerships.com/hire-a-partner/"
                title="Why Hire A Partner"
              >
                Checkout benefits of hiring a Pinnacle Parnter.
              </ListItem>
              <ListItem
                className="dark:hover:bg-meta-4 dark:text-white"
                href="https://pinnaclepartnerships.com/meeting/"
                title="Schedule A Meeting"
              >
                Schedule Meeting with our real estate industry experts.
              </ListItem>
              <ListItem
                className="dark:hover:bg-meta-4 dark:text-white"
                href="https://pinnaclepartnerships.com/directory/"
                title="Directory Access"
              >
                Access to network of top-tier real estate professionals.Hire A
                Pinnacle Pro
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <NavigationMenuTrigger className="relative font-satoshi text-body   font-medium flex items-center justify-center    hover:text-primary ">
            Join Us
          </NavigationMenuTrigger>
          <NavigationMenuContent className="  dark:bg-boxdark absolute font-satoshi mt-2.5 w-56 rounded-sm border  border-whiten dark:border-slate-700 bg-white shadow-default">
            <ul className="grid gap-2 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="https://pinnaclepartnerships.com/member-application/"
                  >
                    <Image
                      src="/images/logo/pp_mainlogo.png"
                      alt="Pinnacle-Partnerhsips-Logo"
                      height={60}
                      width={60}
                    />
                    <div className="mb-2 mt-4 text-lg dark:text-white font-medium">
                      Pinnacle Partnerships Member Application
                    </div>
                    <a className="text-sm font-satoshi  leading-tight text-muted-foreground">
                      Start your application now and unlock endless
                      opportunities together!.
                    </a>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                className="dark:hover:bg-meta-4 dark:text-white"
                href="https://pinnaclepartnerships.com/join-partnership/"
                title="Why Join Us"
              >
                Benefits of our Exclusive Participant Mutual Supply Chain
                Ecosystem.
              </ListItem>
              <ListItem
                className="dark:hover:bg-meta-4 dark:text-white"
                href="https://pinnaclepartnerships.com/meeting/"
                title="Schedule A Meeting"
              >
                Understand how Pinnacle Partnerships can elevate your goals to
                new heights .
              </ListItem>
              <ListItem
                className="dark:hover:bg-meta-4 dark:text-white"
                href="https://pinnaclepartnerships.com/leadership-roles/"
                title="Leadership Roles"
              >
                Pinnacle Partnerships thrives because of a triumvirate of
                leadership roles.Understand the roles and responsibilities.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Additional menu items would go here */}
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className="text-primary font-bold hover:underline underline-offset-8 ">
              <FontAwesomeIcon
                icon={faTachometerAlt}
                style={{ marginRight: '2px' }}
              />{' '}
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block  select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-2 focus:bg-gray-2',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
