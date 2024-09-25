import re
import ipaddress

url_scheme = r'^(https?)://' # get a http(s) protocol pattern
url_domain = r'https?://([A-Za-z_0-9.-]+).*' # get a "domain.com" pattern
url_tld = r'(?:[a-zA-Z]*\.)+([a-zA-Z]+)(?:\/.*)?' # get a top-level-domain (e.g: .com) pattern
url_subdomain = r'^(?:https?:\/\/)?(?:\.)?([^\/:?#]+)' # get a subdomain (e.g: www) pattern
url_digits = r'\d+' # get all the num digits in url pattern
url_specialchar = r'[^A-Za-z0-9]' # get all the specialcharacters in domain pattern

def process_url(url):
    # Get urllength
    def get_urllength(url):
        return len(url)

    # Check for Ipaddress
    def check_ip(url):
        domain = re.search(url_domain, url).group(1)

        try:
            if ipaddress.ip_address(domain):
               return 1
        except ValueError:
            return 0 # if the domain was not a ipaddress

    # Get a tld
    def get_tld(url):
        try:
            tld = re.findall(url_tld, url)[0]
            return len(''.join(tld))
        except IndexError:
            return 0 # If the domain was ipaddress
    
    # Get the avialable subdomain
    def get_subdomain(url):
        domain = re.search(url_subdomain, url).group(1)
        subdomains = domain.split('.')[:-2]
        return len(subdomains) if subdomains else 0
    
    # Get the avialable num digits in url
    def get_num_digits(url):
        url = re.findall(url_digits, url)
        return len(list(''.join(url)))

    # Get the total of specialchar in domain
    def get_specialchar(url):
        url = re.sub(url_scheme, '', url)
        regex = re.findall(url_specialchar, url)
        return len(regex)
    
    # Check if the protocol was secure
    def check_scheme(url):
        url = re.findall(url_scheme, url)[0]
        return 1 if url == 'https' else 0
    
    return [[get_urllength(url), check_ip(url), get_tld(url), get_subdomain(url), get_num_digits(url), get_specialchar(url), check_scheme(url)]]
